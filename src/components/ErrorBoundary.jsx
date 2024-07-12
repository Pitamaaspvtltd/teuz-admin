// ErrorBoundary.jsx
import React, { Component } from "react"

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Something went wrong.</h1>
					{/* Optionally, you can provide more detailed error information */}
					{/* <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details> */}
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
