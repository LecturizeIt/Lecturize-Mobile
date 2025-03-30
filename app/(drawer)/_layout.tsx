import CustomHeader from '@/components/custom-header';
import { Icon } from '@/components/ui/icon';
import { useAuthContext } from '@/contexts/auth-context';
import "@/global.css";
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { BookOpenText, KeyRound, Settings } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  return (
    <GestureHandlerRootView className='flex-1'>
      <Drawer screenOptions={{
        drawerStyle: { maxWidth: "70%" },
        swipeEnabled: false,
        header: (props) => <CustomHeader {...props} />,
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
