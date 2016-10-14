import _ from "lodash";
import {variableScale} from "../../common/colors";
import {mkSummaryTableHeadings} from "../utilities";


const bindings = {
    applications: '<',
    definition: '<',
    summary: '<',
    values: '<'
};


const template = require('./entity-statistic-detail-panel.html');
const PIE_SIZE = 140;


function mkStatChartData(counts = [], onSelect) {
    return {
        config: {
            colorProvider: (d) => variableScale(d.data.key),
            labelProvider: d => d.key,
            onSelect,
            size: PIE_SIZE
        },
        data: _.chain(counts)
            .map(c => ({ key: c.id, count: c.count }))
            .value()
    };
}


function controller() {
    const vm = this;

    const pieClickHandler = d => {
        vm.selectedPieSegment = d;
    };

    vm.$onChanges = () => {
        vm.pie = mkStatChartData(
            vm.summary ? vm.summary.tallies : [],
            pieClickHandler);

        vm.tableHeadings = mkSummaryTableHeadings(vm.definition);
        vm.lastUpdatedAt = vm.summary ? vm.summary.lastUpdatedAt : '';
    }
}


const component = {
    bindings,
    controller,
    template
};


export default component;