import React, { Component } from "react";
import Button from "@mui/material/Button";

class button extends Component {
	render() {
		return (
			<div>
				message: {this.props.message}
				<Button variant="contained" onClick={this.props.onClickSubmit}>
					Submit
				</Button>
			</div>
		);
	}
}
export default button;
