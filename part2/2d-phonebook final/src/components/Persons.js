const Persons = ({ dataObj = [], onNoteDelete }) => {
  return (
    <div>
      <table>
        <tbody>
          {dataObj.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.number}</td>
              <td>
                <button onClick={() => onNoteDelete(item.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
