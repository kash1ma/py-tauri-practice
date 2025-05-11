interface IEditProps<T> {
    data: T;
    renderField: (data: T) => JSX.Element;
}

const UsersAdminCrud = <T,>({ data, renderField }: IEditProps<T>) => {
    return (
        <div>
            {renderField(data)}
        </div>
    );
};
export default UsersAdminCrud