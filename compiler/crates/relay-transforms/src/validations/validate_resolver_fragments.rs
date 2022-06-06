/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

use crate::relay_resolvers::get_argument_value;
use crate::{
    ValidationMessage, RELAY_RESOLVER_DIRECTIVE_NAME, RELAY_RESOLVER_FRAGMENT_ARGUMENT_NAME,
};
use common::{Diagnostic, DiagnosticsResult, NamedItem};
use graphql_ir::{
    FragmentDefinition, FragmentSpread, OperationDefinition, Program, Validator, Variable,
};
use intern::string_key::StringKeySet;
use schema::{SDLSchema, Schema};

pub fn validate_resolver_fragments(program: &Program) -> DiagnosticsResult<()> {
    ValidateResolverFragments::new(&program.schema).validate_program(program)
}

struct ValidateResolverFragments {
    resolver_fragments: StringKeySet,
    current_fragment: Option<FragmentDefinition>,
}

impl ValidateResolverFragments {
    fn new(schema: &SDLSchema) -> Self {
        let validator = Self {
            current_fragment: None,
            resolver_fragments: schema
                .fields()
                .filter_map(|field| {
                    if !field.is_extension {
                        return None;
                    }

                    field
                        .directives
                        .named(*RELAY_RESOLVER_DIRECTIVE_NAME)
                        .and_then(|directive| {
                            let arguments = &directive.arguments;
                            get_argument_value(
                                arguments,
                                *RELAY_RESOLVER_FRAGMENT_ARGUMENT_NAME,
                                field.name.location,
                            )
                            .ok()
                        })
                })
                .collect::<StringKeySet>(),
        };

        validator
    }
}

impl Validator for ValidateResolverFragments {
    const NAME: &'static str = "ValidateResolverFragments";
    const VALIDATE_ARGUMENTS: bool = true;
    const VALIDATE_DIRECTIVES: bool = true;

    fn validate_operation(&mut self, _operation: &OperationDefinition) -> DiagnosticsResult<()> {
        Ok(())
    }

    fn validate_fragment(&mut self, fragment: &FragmentDefinition) -> DiagnosticsResult<()> {
        if self.resolver_fragments.contains(&fragment.name.item) {
            self.current_fragment = Some(fragment.clone());
            let result = self.default_validate_fragment(fragment);
            self.current_fragment = None;

            result
        } else {
            Ok(())
        }
    }

    fn validate_fragment_spread(&mut self, spread: &FragmentSpread) -> DiagnosticsResult<()> {
        Err(vec![Diagnostic::error(
            format!(
                "Using fragment spread `...{}` is not supported in the Relay resolvers fragments. The runtime API for reading the data of these fragments is not implemented, yet.",
                spread.fragment.item
            ),
            spread.fragment.location,
        )])
    }

    fn validate_variable(&mut self, variable: &Variable) -> DiagnosticsResult<()> {
        let current_fragment = self.current_fragment.as_ref().unwrap();
        if !current_fragment
            .variable_definitions
            .iter()
            .any(|var| var.name.item == variable.name.item)
        {
            return Err(vec![Diagnostic::error(
                ValidationMessage::UnsupportedGlobalVariablesInResolverFragment {
                    variable_name: variable.name.item,
                    fragment_name: current_fragment.name.item,
                },
                variable.name.location,
            )]);
        }

        Ok(())
    }
}
