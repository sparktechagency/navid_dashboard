import React from 'react';
import UserManageTable from '../../Components/Tables/UserManageTable.jsx';
import PageHeading from '../../Components/Shared/PageHeading.jsx';

const UserManage = () => {
  return (
    <div className="bg-[var(--black-200)] p-2 rounded mt-4 text-[var(--white-600)]">
      <div className="between-center">
        <PageHeading text={'User Management'}></PageHeading>
      </div>
      <UserManageTable pagination={false} />
    </div>
  );
};

export default UserManage;
