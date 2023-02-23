const handleScrollCompanyType = async (event: any) => {
    const target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
        setCurrentPageCategoryTypes(currentPageCategoryTypes + 1);
    }
};