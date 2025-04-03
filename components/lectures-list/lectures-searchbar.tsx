import { SearchIcon } from "lucide-react-native";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const LecturesSearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(async () => {
      router.setParams({ query: search })
    }, 500);

    return () => clearTimeout(id);
  }, [search, router]);

  return (
    <>
      <Input className="mt-8 w-full max-w-[350px] mx-auto">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder="Pesquise por palestras..."
          type="text"
          defaultValue={search}
          onChangeText={setSearch}
        />
      </Input>
    </>
  )
}

export default LecturesSearchBar;
