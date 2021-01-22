import React, { Component } from "react";
import { Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@material-ui/core";


class addActivity extends Component {
    render() {
        return (
            <form>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h3 className="h-auth">Add new activity</h3>
                        <div className="form-group">
                            <label>Activity Name</label>
                            <input
                                type="text"
                                name="activityName"
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter new activity name..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Access Code</label>
                            <input
                                type="text"
                                name="accessCode"
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter an acces code..."
                            />
                        </div>

                   
                        <div className='form-group'>
                            <label className='form-label'>Start Date</label>
                            <input
                                className='form-input'
                                type='date'
                                name='startDate'
                                placeholder="start date"
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>End Date</label>
                            <input
                                className='form-input'
                                type='date'
                                name='endDate'
                            />
                        </div>

                        <div className='form-group'>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="activityType" name="activityType" value={this.value} onChange={this.handleChange}>
                                <FormControlLabel value="Seminar" control={<Radio />} label="Seminar" />
                                <FormControlLabel value="Curs" control={<Radio />} label="Curs" />
                            </RadioGroup>
                        </FormControl>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Submit
              </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default addActivity;