import CustomDrawerContent from '@/components/custom-drawer-content';
import CustomHeader from '@/components/custom-header';
import SuspenseLoading from '@/components/suspense-loading';
import { Icon } from '@/components/ui/icon';
import { useAuthContext } from '@/contexts/auth-context';
import "@/global.css";
import { getThemeColor } from '@/utilities/utils';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { BookOpenText, KeyRound, Settings } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function DrawerLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView className='flex-1'>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerStyle: { maxWidth: "70%", backgroundColor: getThemeColor("background", colorScheme) },
          swipeEnabled: false,
          header: (props) => <CustomHeader {...props} />,
          drawerActiveBackgroundColor: getThemeColor("card", colorScheme),
          drawerActiveTintColor: "#8d00e7"
        }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: "Lectures",
            drawerIcon: ({ color }) => <Icon as={BookOpenText} color={color} />
          }}
          listeners={() => ({
            drawerItemPress: (props) => {
              props.preventDefault();
              router.push("/");
            }
          })}
        />
        <Drawer.Screen
          name="(auth)"
          options={{
            drawerLabel: 'Autenticação',
            title: 'Autenticação',
            drawerIcon: ({ color }) => <Icon as={KeyRound} color={color} />,
          }}
          redirect={isAuthenticated}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: ({ color }) => <Icon as={Settings} color={color} />
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
