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

import angular from 'angular';

import {registerStores} from '../common/module-utils';
import nagMessageService from "./services/nag-message-service";
import * as  SettingsStore from "./services/settings-store";
import settingsService from "./services/settings-service";
import hierarchiesStore from "./services/hierarchies-store";
import hasSetting from "./directives/has-setting";
import Routes from './routes';


export default () => {

    const module = angular.module('waltz.system', []);

    module
        .service('NagMessageService', nagMessageService)
        .service('SettingsService', settingsService)
        .service('HierarchiesStore', hierarchiesStore);

    registerStores(module, [ SettingsStore ]);

    module
        .directive('waltzHasSetting', hasSetting);

    module
        .config(Routes);


    return module.name;
};
