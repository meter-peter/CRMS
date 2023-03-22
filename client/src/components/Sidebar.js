import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 240,
  },
});

const Sidebar = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <StyledDrawer open={open} onClose={onClose}>
      <List>
        <ListItem button>
          <ListItemIcon>{/* Add your icon component here */}</ListItemIcon>
          <ListItemText primary={t('dashboard')} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{/* Add your icon component here */}</ListItemIcon>
          <ListItemText primary={t('users')} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{/* Add your icon component here */}</ListItemIcon>
          <ListItemText primary={t('reservations')} />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
