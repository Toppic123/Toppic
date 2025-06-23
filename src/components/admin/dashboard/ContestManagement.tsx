
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

  // Create wrapper functions to handle the type conversions
  const handleEditById = (id: string) => {
    const contest = filteredContests.find(c => c.id === id);
    if (contest) {
      handleEditContest(contest);
    }
  };

  const handleFormDataChange = (data: any) => {
    if (typeof data === 'function') {
      handleFormChange(data(formData));
    } else {
      handleFormChange(data);
    }
  };

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
        onEdit={handleEditById}
        onDelete={handleDeleteContest}
      />

      <ContestFormDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        contestFormData={formData}
        setContestFormData={handleFormDataChange}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default ContestManagement;
