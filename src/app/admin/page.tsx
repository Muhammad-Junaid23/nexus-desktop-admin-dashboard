export default function AdminRootRedirect() {
  const stats = [
    { title: 'Total Users', value: '50' },
    { title: 'Pending Requests', value: '6' },
    { title: 'Revenue This Month', value: '$4,300' },
  ];

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Dashboard Overview</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {stats.map((stat, i) => (
          <div key={i} className='p-6 rounded-xl shadow bg-white'>
            <p className='text-sm text-gray-500'>{stat.title}</p>
            <p className='text-2xl font-bold mt-2'>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
