import LectureCard from '@/components/lectures-list/lecture-card';
import NoLecturesFound from '@/components/no-lectures-found';
import ProfileHeader from '@/components/profile-list/profile-header';
import StickyHeader from '@/components/profile-list/sticky-header';
import SuspenseLoading from '@/components/suspense-loading';
import { Text } from '@/components/ui/text';
import { useLecturesQuery, useUserParticipatingLectures } from '@/lib/queries/lecture-queries';
import { User } from '@/types/auth';
import { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import ErrorMessage from '../error-fallback/error-message';

const ProfileList = ({ email, username }: User) => {
  const [activeTab, setActiveTab] = useState<"lectures" | "participating-lectures">("lectures");
  const lecturesQuery = useLecturesQuery({ user: email, size: 1000 });
  const userParticipatingLectures = useUserParticipatingLectures();

  const profileHeader = useCallback(() => <ProfileHeader username={username} />, [username]);

  const currentTabQuery = activeTab === "lectures" ? lecturesQuery : userParticipatingLectures;

  if (currentTabQuery.isError) {
    return <ErrorMessage error={currentTabQuery.error} />
  }

  return (
    <>
      <SectionList
        sections={[{ data: currentTabQuery.data ?? [] }]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <LectureCard lecture={item} />}
        stickySectionHeadersEnabled
        renderSectionHeader={() => <StickyHeader activeTab={activeTab} setActiveTab={setActiveTab} />}
        ListHeaderComponent={profileHeader}
        ListFooterComponentStyle={{ marginBottom: 16 }}
        ListFooterComponent={() => {
          if (currentTabQuery.isLoading) return <SuspenseLoading className="pt-[4rem]" />;
          if (!currentTabQuery.isLoading && !currentTabQuery.data?.length) return (
            <NoLecturesFound
              className="flex-grow mt-[4rem]"
              title={activeTab === "lectures" ? 'Você ainda não criou nenhuma palestra...' : "Você não está participando de nenhuma palestra..."}
            />
          )
          if (currentTabQuery.data?.length) {
            return <Text className="text-typography-500 text-center">Não há mais palestras a carregar...</Text>
          }
        }}
      />
    </>
  )
}

export default ProfileList;
