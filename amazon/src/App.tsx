import React, { useState } from 'react';

interface Account {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: string;
}

interface Profile {
  profileId: number;
  country: string;
  marketplace: string;
  accountId: number;
}

interface Campaign {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
  profileId: number;
}

interface TableColumn {
  label: string;
  field: string;
  sort: 'asc' | 'desc';
}

interface AccountTableProps {
  accounts: Account[];
  onSelect: (row: Account) => void;
}

const AccountTable: React.FC<AccountTableProps> = ({ accounts, onSelect }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const columns: TableColumn[] = [
    {
      label: 'Account ID',
      field: 'accountId',
      sort: 'asc',
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
    },
    {
      label: 'Auth Token',
      field: 'authToken',
      sort: 'asc',
    },
    {
      label: 'Creation Date',
      field: 'creationDate',
      sort: 'asc',
    },
  ];

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.accountId - b.accountId;
    } else {
      return b.accountId - a.accountId;
    }
  });

  const data = {
    columns: columns,
    rows: sortedAccounts,
  };

  const handleRowClick = (row: Account) => {
    onSelect(row);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="account-table">
      <h1>Accounts</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>
                {column.label}
                {column.field === 'accountId' && (
                  <button onClick={handleSort}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.accountId} onClick={() => handleRowClick(row)}>
              {columns.map((column) => (
                <td key={column.field}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
interface Profile {
  profileId: number;
  country: string;
  marketplace: string;
}

interface Campaign {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
}

interface TableColumn {
  label: string;
  field: string;
  sort: 'asc' | 'desc';
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  onSelect: (row: T) => void;
}

const GenericTable = <T extends { [key: string]: any }>({ data, columns, onSelect }: TableProps<T>) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = [...data].sort((a, b) => {
    const field = columns[0].field;
    if (sortOrder === 'asc') {
      return a[field] - b[field];
    } else {
      return b[field] - a[field];
    }
  });

  const handleRowClick = (row: T) => {
    onSelect(row);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={`${columns[0].field.toLowerCase()}-table`}>
      <h1>{columns[0].field}s</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>
                {column.label}
                {column.field === columns[0].field && (
                  <button onClick={handleSort}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} onClick={() => handleRowClick(row)}>
              {columns.map((column) => (
                <td key={column.field}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ProfileTableProps {
  profiles: Profile[];
  onSelect: (row: Profile) => void;
}

const ProfileTable: React.FC<ProfileTableProps> = ({ profiles, onSelect }) => {
  const columns: TableColumn[] = [
    {
      label: 'Profile ID',
      field: 'profileId',
      sort: 'asc',
    },
    {
      label: 'Country',
      field: 'country',
      sort: 'asc',
    },
    {
      label: 'Marketplace',
      field: 'marketplace',
      sort: 'asc',
    },
  ];

  return <GenericTable data={profiles} columns={columns} onSelect={onSelect} />;
};

interface CampaignTableProps {
  campaigns: Campaign[];
  onSelect: (row: Campaign) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onSelect }) => {
  const columns: TableColumn[] = [
    {
      label: 'Campaign ID',
      field: 'campaignId',
      sort: 'asc',
    },
    {
      label: 'Clicks',
      field: 'clicks',
      sort: 'asc',
    },
    {
      label: 'Cost',
      field: 'cost',
      sort: 'asc',
    },
    {
      label: 'Date',
      field: 'date',
      sort: 'asc',
    },
  ];

  return <GenericTable data={campaigns} columns={columns} onSelect={onSelect} />;
};

const App: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<null | Account | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<null | Profile | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<null | Campaign | null>(null);

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account);
    setSelectedProfile(null);
    setSelectedCampaign(null);
  };

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setSelectedCampaign(null);
  };

  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const filteredProfiles = profiles.filter(
    (profile) => profile.accountId === (selectedAccount?.accountId ?? -1)
  );

  const filteredCampaigns = campaigns.filter(
    (campaign) => campaign.profileId === (selectedProfile?.profileId ?? -1)
  );

  return (
    <div className="app">
      <AccountTable accounts={accounts} onSelect={handleAccountSelect} />
      {selectedAccount && (
        <ProfileTable profiles={filteredProfiles} onSelect={handleProfileSelect} />
      )}
      {selectedProfile && (
        <CampaignTable campaigns={filteredCampaigns} onSelect={handleCampaignSelect} />
      )}
      {selectedCampaign && (
        <div className="selected-campaign">
          <h1>Selected Campaign</h1>
          <p>Campaign ID: {selectedCampaign.campaignId}</p>
          <p>Clicks: {selectedCampaign.clicks}</p>
          <p>Cost: {selectedCampaign.cost}</p>
          <p>Date: {selectedCampaign.date}</p>
        </div>
      )}
    </div>
  );
};


export default App;
