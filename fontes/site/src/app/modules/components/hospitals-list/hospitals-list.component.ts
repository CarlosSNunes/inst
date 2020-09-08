import { Component, OnInit, Input } from '@angular/core';
import Hospitals from './dropdown-data/hospitals-list';
import { DropDownItem } from 'src/app/models';


@Component({
    selector: 'app-hospitals-list',
    templateUrl: './hospitals-list.component.html',
    styleUrls: ['./hospitals-list.component.scss']
})
export class HospitalsListComponent implements OnInit {
    @Input() bigTitle: string = 'Veja todos os hospitais e laboratórios de cada plano';
    @Input() smallTitle: string = 'HOSPITAIS DA REDE CLUB CARE PLUS';
    allStates: DropDownItem[] = [];
    allHospitals: DropDownItem[] = [];
    allPlans: DropDownItem[] = [];
    menuStyle: string = "list";
    gridList: {}[] = [];
    hiddenGrid: boolean = true;
    hiddenList: boolean = true;
    selectedState: DropDownItem = new DropDownItem({ key: '', value: '' });
    selectedType: DropDownItem = new DropDownItem({ key: '', value: '' });
    selectedPlan: DropDownItem = new DropDownItem({ key: '', value: '' });

    constructor() {
        this.mountStateDropdown(Hospitals)
        this.mountTypesDropdown(Hospitals)
        this.mountPlansDropdown(Hospitals)
        this.mountHospitalsList()
    }


    ngOnInit() {
    }

    changeMenuStyle(style) {
        this.menuStyle = style;
        if (style == 'grid') {
            if (this.gridList.length > 0) {
                this.hiddenGrid = false;
                this.hiddenList = true;
            }

        }
        else {
            if (this.gridList.length > 0) {
                this.hiddenGrid = true;
                this.hiddenList = false;
            }
        }
    }

    mountStateDropdown(_states) {
        this.allStates = [];
        for (let state of _states.states) {
            if (this.allStates.length > 0) {
                if (!this.allStates.find(s => s.value === state.state)) {
                    this.allStates.push({ key: state.state, value: state.state })
                }
            } else {
                this.allStates.push({ key: state.state, value: state.state })
            }
        }
    }

    mountTypesDropdown(_state) {
        this.allHospitals = [];
        for (let state of _state.states) {
            for (let hospital of state.unities) {
                if (this.allHospitals.length > 0) {
                    if (!this.allHospitals.find(h => h.value === hospital.type)) {
                        this.allHospitals.push({ key: hospital.type, value: hospital.type })
                    }
                } else {
                    this.allHospitals.push({ key: hospital.type, value: hospital.type })
                }
            }
        }
    }

    mountPlansDropdown(_state) {
        this.allPlans = [];
        for (let state of _state.states) {
            for (let hospital of state.unities) {
                for (let plan of hospital.plans) {
                    if (this.allPlans.length > 0) {
                        if (!this.allPlans.find(p => p.value === plan.plan)) {
                            this.allPlans.push({ key: plan.plan, value: plan.plan })
                        }
                    } else {
                        this.allPlans.push({ key: plan.plan, value: plan.plan })
                    }
                }
            }
        }
    }

    setFilter(filter, selected: DropDownItem, button: boolean = false) {
        if (filter == 'state') {
            this.selectedState = selected
        }
        else if (filter == 'type') {
            if (this.selectedType.value == selected.value && button) {
                this.selectedType = new DropDownItem({ key: '', value: '' });
                selected = new DropDownItem({ key: '', value: '' });
                return
            }
            this.selectedType = selected
        }
        else {
            this.selectedPlan = selected
        }
    }


    mountHospitalsList() {
        this.gridList = []

        if (this.selectedState.value != "" && this.selectedType.value != "" && this.selectedPlan.value != "") {
            for (let state of Hospitals.states) {
                if (state.state == this.selectedState.value) {
                    for (let hospital of state.unities) {
                        if (hospital.type == this.selectedType.value) {
                            for (let plan of hospital.plans) {
                                if (plan.plan == this.selectedPlan.value && plan.included) {
                                    this.gridList.push(hospital)
                                }
                            }
                        }
                    }
                }
            }
        } else if (this.selectedState.value != "") {
            if (this.selectedType.value != "" || this.selectedPlan.value != "") {
                if (this.selectedType.value != "") {
                    for (let state of Hospitals.states) {
                        if (state.state == this.selectedState.value) {
                            for (let hospital of state.unities) {
                                if (hospital.type == this.selectedType.value) {
                                    this.gridList.push(hospital)
                                }
                            }
                        }
                    }
                }
                else {
                    for (let state of Hospitals.states) {
                        if (state.state == this.selectedState.value) {
                            for (let hospital of state.unities) {
                                for (let plan of hospital.plans) {
                                    if (plan.plan == this.selectedPlan.value && plan.included) {
                                        this.gridList.push(hospital)
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                for (let state of Hospitals.states) {
                    if (state.state == this.selectedState.value) {
                        for (let hospital of state.unities) {
                            this.gridList.push(hospital)
                        }
                    }
                }
            }
        } else if (this.selectedType.value != "") {
            if (this.selectedPlan.value != "") {
                for (let state of Hospitals.states) {
                    for (let hospital of state.unities) {
                        if (hospital.type == this.selectedType.value) {
                            for (let plan of hospital.plans) {
                                if (plan.plan == this.selectedPlan.value && plan.included) {
                                    this.gridList.push(hospital)
                                }
                            }
                        }
                    }
                }
            } else {
                for (let state of Hospitals.states) {
                    for (let hospital of state.unities) {
                        if (hospital.type == this.selectedType.value) {
                            this.gridList.push(hospital)
                        }
                    }
                }
            }
        } else if (this.selectedPlan.value != "") {
            for (let state of Hospitals.states) {
                for (let hospital of state.unities) {
                    for (let plan of hospital.plans) {
                        if (plan.plan == this.selectedPlan.value && plan.included) {
                            this.gridList.push(hospital)
                        }
                    }
                }
            }
        }
        else {
            for (let state of Hospitals.states) {
                for (let hospital of state.unities) {
                    this.gridList.push(hospital)
                }
            }
        }
        this.changeMenuStyle(this.menuStyle)
    }
}
