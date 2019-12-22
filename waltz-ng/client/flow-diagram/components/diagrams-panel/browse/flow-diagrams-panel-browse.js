/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016, 2017, 2018, 2019 Waltz open source project
 * See README.md for more information
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific
 *
 */

import _ from "lodash";


import template from "./flow-diagrams-panel-browse.html";

import {initialiseData} from "../../../../common/index";
import {CORE_API} from "../../../../common/services/core-api-utils";


const bindings = {
    parentEntityRef: "<",
    canCreate: "<",
    onSelectDiagram: "<",
    onCreateDiagram: "<?",
    onEditDiagram: "<?",
};


const initialState = {};

function controller(serviceBroker) {

    const vm = initialiseData(this, initialState);

    vm.$onInit = () => {
        serviceBroker
            .loadViewData(
                CORE_API.FlowDiagramStore.findByEntityReference,
                [ vm.parentEntityRef ],
                { force: true })
            .then(r => {
                vm.diagrams = _.orderBy(r.data, "name");
            });
    }

}


controller.$inject = [
    "ServiceBroker"
];


const component = {
    controller,
    template,
    bindings
};


export default {
    component,
    id: "waltzFlowDiagramsPanelBrowse"
};