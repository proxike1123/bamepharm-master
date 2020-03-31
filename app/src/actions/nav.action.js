import {StackActions, NavigationActions} from 'react-navigation';

export const navigateToPage = (pageName, data) => {
  return NavigationActions.navigate({
    routeName: pageName,
    params: data,
  });
};

export const toggleDrawer = () => {
  return NavigationActions.navigate({routeName: 'DrawerToggle'});
};

export const navigateBack = () => {
  return NavigationActions.back({});
};

export const resetPage = page => {
  return StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: page})],
  });
};
