/** @jsx h */
import {Component, h, JSX} from 'preact';
import {NavigationBar} from './NavBar';
import OverviewFlow from './Flow';

export interface HomeProps {
    title: string
}

interface HomeState {
    title: string
}


const elements = [
    { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    // you can also pass a React Node as a label
    { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
];

export class Home extends Component<HomeProps, HomeState> {

    public state = {
        title: 'local state'
    };

    constructor(props: HomeProps) {
        super(props);
        this.state.title += ' - ' + props.title;
    }

    componentDidMount(): void {
        setTimeout(() => {
            const {state} = this;

            state.title = 'Preact\'s [componentDidMount] worked as expected';
            this.setState(state);
        }, 2000);
    }


    render(): JSX.Element {
        return <div>
            <NavigationBar></NavigationBar>;
            <div style={{height: 500}}>
                <OverviewFlow></OverviewFlow>
            </div>
        </div>;
    }
}

export const DefaultHome = (): JSX.Element => <Home title='Preact boilerplate (v2)'/>;
