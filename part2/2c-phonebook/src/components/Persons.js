const Persons = ({ dataObj = [] }) => {
  return (
    <div>
      <table>
        <tbody>
          {dataObj.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
