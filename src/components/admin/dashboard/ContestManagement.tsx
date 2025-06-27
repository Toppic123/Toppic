
import { useContests } from "./contests/hooks/useContests";
import { useContestForm } from "./contests/hooks/useContestForm";
import ContestHeader from "./contests/ContestHeader";
import ContestSearch from "./contests/ContestSearch";
import ContestList from "./contests/ContestList";
import ContestFormDialog from "./contests/ContestFormDialog";

export const ContestManagement = () => {
  const {
    filteredContests,
    searchQuery,
    isLoading,
    handleContestSearch,
    handleDeleteContest,
    fetchContests
  } = useContests();
  
  const {
    formData,
    isDialogOpen,
    setIsDialogOpen,
    handleEditContest,
    handleCreateNewContest,
    handleSaveChanges
  } = useContestForm(fetchContests);

  return (
    <>
      <ContestHeader onCreateNew={handleCreateNewContest} />
      
      <ContestSearch 
        searchQuery={searchQuery} 
        onSearch={handleContestSearch} 
      />
      
      <ContestList 
        contests={filteredContests}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onEdit={(id: string) => {
          const contest = filteredContests.find(c => c.id === id);
          if (contest) {
            handleEditContest(contest);
          }
        }}
        onDelete={handleDeleteContest}
      />

      <ContestFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        contest={formData.id ? {
          id: formData.id,
          title: formData.title,
          organizer: formData.organizer,
          location: formData.location,
          description: formData.description,
          imageUrl: formData.imageUrl,
          startDate: formData.startDate,
          endDate: formData.endDate,
          photoDeadline: formData.photoDeadline,
          status: formData.status,
          is_private: formData.is_private,
          contest_password: formData.contest_password,
          minimum_distance_km: formData.minimum_distance_km,
        } : null}
        onSubmit={handleSaveChanges}
      />
    </>
  );
};

export default ContestManagement;
