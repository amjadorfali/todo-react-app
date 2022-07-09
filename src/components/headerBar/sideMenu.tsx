import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

const SideMenu: React.FC<{ handleCloseMenu: () => void }> = ({ handleCloseMenu }) => {
  const navigate = useNavigate();
  // const clearCompletedTodos = () => {
  //   const localData = JSON.parse(localStorage.getItem('todosLists') || '') as TodosListGroups;
  //   Object.keys(localData).map((todoCategory) => {
  //     localData[todoCategory as keyof typeof localData] = localData[todoCategory as keyof typeof localData].filter((todo) => !todo.isComplete);
  //     return null;
  //   });

  //   localStorage.setItem('todosLists', JSON.stringify(localData));
  //   window.location.reload();
  // };
  // const clearCache = () => {
  //   localStorage.clear();
  //   window.location.reload();
  // };

  const routeToPath = (path: string) => () => {
    navigate(path, { replace: true });
  };
  return (
    <div style={{ width: '15.5rem' }} role="presentation" onClick={handleCloseMenu} onKeyDown={handleCloseMenu}>
      <List>
        <ListItem onClick={routeToPath(RoutesConfig.HOME)} button key={'Home'}>
          <ListItemIcon>
            <HomeTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem onClick={routeToPath(RoutesConfig.DO_IT)} button key={RoutesConfig.DO_IT}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={'Todos'} />
        </ListItem>
      </List>
    </div>
  );
};

export default SideMenu;
