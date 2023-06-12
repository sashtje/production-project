import {Counter} from "./components/Counter";
import './index.scss';

export const App = () => {
    return (
        <div className="app">
            Counter
            <Counter />
        </div>
    );
};