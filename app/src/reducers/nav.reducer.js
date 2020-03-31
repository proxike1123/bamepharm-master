import { createNavigationReducer } from "react-navigation-redux-helpers";
import { AppNavigator } from "../navigators/app.navigator";

export const navReducer = createNavigationReducer(AppNavigator);
