
import { useContests } from "./contests/hooks/useContests";
import { useContestForm } from "./contests/hooks/useContestForm";
import ContestHeader from "./contests/ContestHeader";
import ContestSearch from "./contests/ContestSearch";
import ContestList from "./contests/ContestList";
import ContestFormDialog from "./contests/ContestFormDialog";
import { useEffect } from "react";

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
    contestFormData,
    setContestFormData,
    isEditContestDialogOpen,
    setIsEditContestDialogOpen,
    handleEditContest,
    handleCreateNewContest,
    handleSaveContestChanges
  } = useContestForm(fetchContests);
  
  // Re-fetch contests when the component mounts
  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <div className="space-y-4">
      <ContestHeader onCreateNew={handleCreateNewContest} />
      
      <ContestSearch 
        searchQuery={searchQuery} 
        onSearch={handleContestSearch} 
      />
      
      <ContestList 
        contests={filteredContests}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onEdit={handleEditContest}
        onDelete={handleDeleteContest}
      />

      <ContestFormDialog 
        isOpen={isEditContestDialogOpen}
        setIsOpen={setIsEditContestDialogOpen}
        contestFormData={contestFormData}
        setContestFormData={setContestFormData}
        handleSaveChanges={handleSaveContestChanges}
      />
    </div>
  );
};

export default ContestManagement;
