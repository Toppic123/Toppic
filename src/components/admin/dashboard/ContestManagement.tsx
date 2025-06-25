
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
        contest={formData.editingContest}
        onSubmit={handleSaveChanges}
      />
    </>
  );
};

export default ContestManagement;
