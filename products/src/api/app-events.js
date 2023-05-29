module.exports = (app) => {
    app.use('/app-events', (req, res) => {

        console.log('============= Product Service Received Event ==================');

        return res.status(200).json();
    })
}