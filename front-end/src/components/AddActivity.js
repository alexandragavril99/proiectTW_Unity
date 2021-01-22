import React, { Component } from "react";
import { Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@material-ui/core";


class addActivity extends Component {
    render() {
        return (
            <form>
                <div className="page-inner">
                    <h3 className="h-auth">Add new activity</h3>
                        <div>
                            <label className="input-h">Activity Name</label>
                            <input
                                type="text"
                                name="activityName"
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter new activity name"
                            />

                            <label className="input-h">Access Code</label>
                            <input
                                type="text"
                                name="accessCode"
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter an acces code"
                            />
                        </div>
                   
                    <div>             
                        <label className="input-h">Start Date</label>
                        <input
                            className='form-control'
                            type='date'
                            name='startDate'
                        />

                    <label className="input-h">End Date</label>
                    <input
                            className='form-control'
                            type='date'
                            name='endDate'
                    />
                    </div>   

                    <FormControl component="fieldset" className="form-check">
                        <label className="input-h">Activity Type</label>
                        <RadioGroup aria-label="activityType" name="activityType" value={this.value} onChange={this.handleChange}>
                            <FormControlLabel value="Seminar" control={<Radio />} label="Seminar" />
                            <FormControlLabel value="Curs" control={<Radio />} label="Curs" />
                        </RadioGroup>
                        </FormControl>
                    <button type="submit" className="btn-login">
                        Add Activity
                    </button>
                </div>
            </form>
        );
    }
}

export default addActivity;