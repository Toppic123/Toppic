
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
    handleFormChange,
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
        onEdit={handleEditContest}
        onDelete={handleDeleteContest}
      />

      <ContestFormDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        contestFormData={formData}
        setContestFormData={handleFormChange}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default ContestManagement;
