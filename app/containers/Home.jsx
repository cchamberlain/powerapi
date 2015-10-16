import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class Home extends React.Component {
	static getProps() {
		return {}
	}
	render() {
		return <div>
		<Row>
			<Col xs={12}>
				<h3>hacks - your mission should you choose to accept it</h3>
				<ul>
					<ol>Hack the Windows computer</ol>
					<ol>Brute force the social site</ol>
					<ol>Hack into the mainframe</ol>
				</ul>
			</Col>
		</Row>
		<Row>
			<Col xs={12}>
				<h3>unlocks - improve your hacking</h3>
				<h5>editors</h5>
				<ul>
					<li>notepad</li>
					<li>vim</li>
					<li>sublime</li>
				</ul>
				<h5>shells</h5>
				<ul>
					<li>bash</li>
					<li>zsh</li>
				</ul>
				<h5>languages</h5>
				<ul>
					<li>JavaScript (ES5)</li>
					<li>node (ES6)</li>
					<li>AngularJS</li>
					<li>React (JSX)</li>
				</ul>
			</Col>
		</Row>
		</div>
	}
}
