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

import {getParents} from "../../../common/hierarchy-utils";
import {CORE_API} from "../../../common/services/core-api-utils";
import {mkSelectionOptions} from "../../../common/selector-utils";
import {hierarchyQueryScope} from '../../../common/services/enums/hierarchy-query-scope';
import {lifecycleStatus} from '../../../common/services/enums/lifecycle-status';

import template from "./data-type-overview.html";


const bindings = {
    filters: "<",
    parentEntityRef: "<"
};


function controller(serviceBroker) {
    const vm = this;

    const loadAll = () => {
        const selector = mkSelectionOptions(
            vm.parentEntityRef,
            hierarchyQueryScope.CHILDREN.key,
            [lifecycleStatus.ACTIVE.key],
            vm.filters);

        serviceBroker
            .loadAppData(CORE_API.DataTypeStore.findAll)
            .then(r => {
                const dataTypes = r.data;
                const dataTypesById = _.keyBy(dataTypes, "id");
                const dataType = dataTypesById[vm.parentEntityRef.id];
                vm.dataType = dataType;
                vm.parents = getParents(dataType, n => dataTypesById[n.parentId]);
            });

        serviceBroker
            .loadViewData(
                CORE_API.ApplicationStore.findBySelector,
                [ selector ])
            .then(r => vm.apps = r.data);

        serviceBroker
            .loadViewData(
                CORE_API.DataTypeUsageStore.calculateStats,
                [ selector ])
            .then(r => vm.usageStats = r.data);
    };

    vm.$onInit = () => {
        loadAll();
    };


    vm.$onChanges = (changes) => {
        if(changes.filters) {
            loadAll();
        }
    };
}


controller.$inject = [
    "ServiceBroker"
];


const component = {
    bindings,
    template,
    controller
};


const id = "waltzDataTypeOverview";

export default {
    component,
    id
};
