import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import router from 'next/router';
import Typography from '@mui/material/Typography';
import BackdropLoading from '@components/BackdropLoading';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
  AdminPanelSettings,
  ExitToApp,
  Home,
  Keyboard,
} from '@mui/icons-material';

const drawerWidth = 240;

interface LayoutAdminProps {
  children: JSX.Element;
  title: string;
}

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    icon: <Home />,
    path: '/admin/dashboard',
  },
  // {
  //   label: 'Parameter',
  //   icon: <AdminPanelSettings />,
  //   path: '/admin/parameter',
  // },
  {
    label: 'Input Nilai',
    icon: <Keyboard />,
    path: '/admin/input',
  },
];

const LayoutAdmin: React.FC<LayoutAdminProps> = ({ children, title }) => {
  const { data: session, status } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (session === null) {
      router.push(`/?redirect_url=${router.asPath}`);
    }
    if (session && session.user.role === 'user') {
      router.push('/result');
    }
  }, [session, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loading = status === 'loading';

  if (loading) return <BackdropLoading />;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MENU_ITEMS.map((item) => {
          return (
            <ListItem
              button
              onClick={() => router.push(item.path)}
              key={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}

        <Divider />

        <ListItem
          button
          onClick={() =>
            signOut({
              callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
            })
          }
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              {title}
            </Typography>
          </Box>

          <Typography variant='h6' noWrap component='div'>
            {session?.user?.email}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default LayoutAdmin;
