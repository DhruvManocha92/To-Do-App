import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import data from '../src/StubbedJson';
import '../src/App.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quickFilterText: null,
            columnDefs: [
                { headerName: "User Story Description", field: "taskName" },
                { headerName: "User Story Number", field: "userStoryId" },
                { headerName: "User Story Status", field: "status", checkboxSelection: true }],
            rowData: data,
            userStoryNumber: '',
            userStoryDescription: ''
        }
    }

    changeStoryNumber(event) {
        this.setState({ userStoryNumber: event.target.value })
    }

    changeStoryDescription(event) {
        this.setState({ userStoryDescription: event.target.value });
    }

    addDetails(event) {
        if (this.state.userStoryNumber !== '' && this.state.userStoryDescription !== '') {
            var addedObject = { taskName: this.state.userStoryDescription, userStoryId: this.state.userStoryNumber, status: "completed" }
            this.setState({
                rowData: this.state.rowData.concat(addedObject),
                userStoryDescription: '',
                userStoryNumber: '',
            })
        }
    }

    onQuickFilterText(event) {
        this.setState({ quickFilterText: event.target.value });
    }
    render() {
        return (
            <div>
                <div>
                    <nav className="navbar-inverse">
                        <div className="container-fluid Header">
                            <div className="navbar-header" style={{ color: '#fff' }}>
                                To Do App !!!
                        </div>

                        </div>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-sm-2 pull-left">
                        <label><b>User Story Number</b></label>
                    </div>
                    <div className="col-sm-4 pull-left" >
                        <input type="text" placeholder="Enter user story number here..." style={{ width: '100%' }} onChange={this.changeStoryNumber.bind(this)}></input>
                    </div>
                    <div className="col-sm-2 pull-left">
                        <label><b>User Story Description</b></label>
                    </div>
                    <div className="col-sm-4 pull-left" >
                        <input type="text" placeholder="Enter user story description here..." style={{ width: '100%' }} onChange={this.changeStoryDescription.bind(this)}></input>
                    </div>

                </div>

                <div style={{ textAlign: 'center' }}>
                    <button type="button" className="btn btn-secondary" style={{ marginTop: "15px" }} onClick={this.addDetails.bind(this)}>Add</button>
                </div>
                <br />
                <div>
                    <input type="text" id="filter-text-box" placeholder="Type here to filter..." onChange={this.onQuickFilterText.bind(this)} />

                </div>
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '500px',
                    }}
                >
                    <AgGridReact
                        quickFilterText={this.state.quickFilterText}
                        enableSorting={true}
                        enableFilter={true}
                        rowSelection="multiple"
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

export default Form;