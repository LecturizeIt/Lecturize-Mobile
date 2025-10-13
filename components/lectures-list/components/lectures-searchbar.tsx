import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";

const LecturesSearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const id = setTimeout(async () => {
      router.setParams({ q: search })
    }, 500);

    return () => clearTimeout(id);
  }, [search, router]);

  return (
    <>
      <Input className="w-full mx-auto bg-background-card" size="xl" variant="rounded">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder="Pesquise por palestras..."
          type="text"
          value={search}
          onChangeText={setSearch}
          className="text-sm"
        />
      </Input>
    </>
  )
}

export default LecturesSearchBar;
