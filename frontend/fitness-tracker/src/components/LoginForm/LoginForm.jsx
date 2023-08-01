const LoginForm = () => {
    const onSubmit = (e) => {
        
    };

    return (
        <form className="QuestionForm" onSubmit={onSubmit}>
      {(
        <input type="hidden" name="name"  />
      )}
      <div className="control">
        <label htmlFor="name">Your name:</label>
        <input
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="email">email address:</label>
        <input
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="password">password:</label>
        <input
          name="password"
          id="password"
        />
      </div>

      <div className="buttons">
        <button type="submit" >
            Register
        </button>

        <button type="button" >
          Cancel
        </button>
      </div>
    </form>
    )
}

export default LoginForm;