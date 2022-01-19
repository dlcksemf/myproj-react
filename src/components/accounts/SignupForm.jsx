import { useApiAxios } from 'api/base';
import useFieldValues from 'components/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';

// https://tailwindcomponents.com/component/sign-up-form-1

const INITIAL_FIELDVALUES = {
  username: '',
  password: '',
  password2: '',
};

function SignupForm() {
  const navigate = useNavigate();

  const { handleFieldChange, fieldValues } =
    useFieldValues(INITIAL_FIELDVALUES);

  const [{ error, loading, errorMessages }, postUserData] = useApiAxios(
    {
      url: '/accounts/api/signup/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserData({ data: fieldValues }).then(() => {
      navigate('/accounts/login/');
    });
  };

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        {loading && <LoadingIndicator />}
        {error && 'Error during Signup...'}

        <h1 className="text-xl font-semibold">
          Hello there 👋,
          <span className="font-normal">
            please fill in your information to continue
          </span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <label
            htmlFor="username"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            UserName
          </label>
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleFieldChange}
            placeholder="username"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          {errorMessages?.username?.map((message) => (
            <p className="text-red-400 text-xs">{message}</p>
          ))}

          <label
            htmlFor="password"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            onChange={handleFieldChange}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          {errorMessages?.password?.map((message) => (
            <p className="text-red-400 text-xs">{message}</p>
          ))}

          <label
            htmlFor="password-confirm"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Confirm password
          </label>
          <input
            id="password-confirm"
            type="password"
            name="password2"
            placeholder="********"
            onChange={handleFieldChange}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          {errorMessages?.non_field_errors?.map((message) => (
            <p className="text-red-400 text-xs">{message}</p>
          ))}

          <button className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
            Sign up
          </button>

          <p
            onClick={() => {
              navigate('/accounts/login/');
            }}
            className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"
          >
            Already registered?
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
