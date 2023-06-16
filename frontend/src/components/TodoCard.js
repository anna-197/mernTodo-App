const TodoCard = ({ data, handleEdit, handleDelete }) => {
    return (
      <li key={data._id}>
        <div className="title-description">
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
  
        <div className="button-container">
          <button className="button" name={data._id} onClick={handleEdit}>
            edit
          </button>
          <button className="button" name={data._id} onClick={handleDelete}>
            delete
          </button>
        </div>
      </li>
    );
  };
  
  export default TodoCard;
  