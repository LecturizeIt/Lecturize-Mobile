import { Tabs } from "expo-router";

const ACCENT_PURPLE = "#962dff";

const AuthLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACCENT_PURPLE,
        headerShown: false,
        tabBarStyle: {
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          overflow: "hidden",
          borderWidth: 1,

        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "800",
          fontSize: 14
        }
      }}>
      <Tabs.Screen
        name='login'
        options={{
          title: "Login",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => null,
        }}
      />
      <Tabs.Screen
        name='register'
        options={{
          title: "Register",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => null,
        }}
      />
    </Tabs>
  )
}

export default AuthLayout;
