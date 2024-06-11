function TicketCard({ Forename, Surname, emailAddress, Issue }) {
    return (
        <div className="ticket-card">
            <h3>{Forename}</h3>
            <h3>{Surname}</h3>
            <h3>{emailAddress}</h3>
            <p>{Issue}</p>
        </div>
    )
}

export default TicketCard;