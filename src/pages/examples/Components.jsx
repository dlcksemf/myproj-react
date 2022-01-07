import Alert from 'components/Alert';

function Components() {
  return (
    <div>
      <h2 className="text-xl border-l-8 border-red-500 pl-2 mb-2">
        Components
      </h2>
      <h3 className="text-lg border-l-4 border-red-500 pl-2 mb-2">Alert</h3>
      <Alert type="info">Info 메세지입니다.</Alert>
      <Alert type="success">Success 메세지입니다.</Alert>
      <Alert type="danger">Danger 메세지입니다.</Alert>
    </div>
  );
}

export default Components;
