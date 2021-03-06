import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
// import useAuth from 'components/hooks/useAuth';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'components/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';

// https://tailwindcomponents.com/component/login-form-14

const INIT_FIELD_VALUES = { username: '', password: '' };

function LoginForm() {
  const navigate = useNavigate();
  const { auth, login } = useAuth();

  const [{ loading, error, errorMessages }, requestToken] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    {
      manual: true,
    },
  );
  const { handleFieldChange, fieldValues } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      login({ ...response.data });

      navigate('/news/');
    });
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error && 'Error during Login...'}

      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
          <div className="text-white mt-10">
            <h1 className="font-bold text-4xl">Welcome</h1>
            <p className="font-semibold">Let's Login!</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-8 mt-10"
          >
            <input
              type="text"
              name="username"
              onChange={handleFieldChange}
              value={fieldValues.username}
              placeholder="Username"
              className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500 text-white"
            />
            {errorMessages?.username?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}

            <input
              type="password"
              name="password"
              onChange={handleFieldChange}
              value={fieldValues.password}
              placeholder="******************"
              className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500 text-white"
            />
            {errorMessages?.password?.map((message, index) => (
              <p key={index} className="text-xs text-red-400">
                {message}
              </p>
            ))}

            <button className="border border-indigo-100 bg-indigo-100 text-white rounded-lg py-3 font-semibold">
              Submit
            </button>
          </form>
        </div>
      </div>

      <DebugStates fieldValues={fieldValues} auth={auth} />
    </div>
  );
}

export default LoginForm;
