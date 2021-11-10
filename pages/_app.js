import App from 'next/app';
import '../styles/styles.scss';

class MyApp extends App {
	render() {
		const { children, pageProps, Component } = this.props;
		return (
			<Component {...pageProps} />
		)
	}
}
export default MyApp;