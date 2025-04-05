import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";

const LecturerSearchbar = () => {
  const router = useRouter();
  const { lecturer: lecturerFilter } = useGlobalSearchParams<{ lecturer?: string }>();
  const [lecturer, setLecturer] = useState(() => lecturerFilter ? lecturerFilter : "");

  useEffect(() => {
    const id = setTimeout(async () => {
      router.setParams({ lecturer: lecturer })
    }, 500);

    return () => clearTimeout(id);
  }, [lecturer, router]);

  return (
    <>
      <Input className="w-full mx-auto bg-background-card" size="md" variant="rounded">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder="Pesquise por um palestrante..."
          type="text"
          value={lecturer}
          onChangeText={setLecturer}
          className="text-sm"
        />
      </Input>
    </>
  )
}

export default LecturerSearchbar;
