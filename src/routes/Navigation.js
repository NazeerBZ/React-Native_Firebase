import { StackNavigator } from 'react-navigation';
import Login from '../containers/Login'
import Signup from '../containers/Signup'
import Patient from '../containers/Patient'
import DrawerNav from './DrawerNav'

const Navigation = StackNavigator(
    {
        "login": {
            screen: Login
        },

        "signup": {
            screen: Signup
        },

        "draweNav": {
            screen: DrawerNav
        },

        "patient": {
            screen: Patient
        }
    },

    {
        navigationOptions: {
            header: null
        }
    }
)

export default Navigation;

