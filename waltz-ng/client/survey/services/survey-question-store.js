/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016  Khartec Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function service($http, baseUrl) {

    const BASE = `${baseUrl}/survey-question`;

    const create = (q) => {
        return $http.post(`${BASE}`, q)
            .then(result => result.data);
    };

    const update = (q) => {
        return $http.put(`${BASE}`, q)
            .then(result => result.data);
    };

    const deleteQuestion = (id) => {
        return $http.delete(`${BASE}/${id}`)
            .then(result => result.data);
    };


    const findForInstance = (id) => {
        return $http.get(`${BASE}/instance/${id}`)
            .then(result => result.data);
    };

    const findForTemplate = (id) => {
        return $http.get(`${BASE}/template/${id}`)
            .then(result => result.data);
    };

    return {
        create,
        update,
        deleteQuestion,
        findForInstance,
        findForTemplate
    };
}


service.$inject = [
    '$http',
    'BaseApiUrl'
];


export default service;
