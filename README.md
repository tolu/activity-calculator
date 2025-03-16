# Aktivitetskalkulatoren (Activity calclulator)

> This is the result of understanding from my partner, after attended the course
> [Aktivitetskalkulatoren for ergoterapeuter](https://www.oslomet.no/om/arrangement/aktivitetskalkulatoren-ergoterapeuter), the dire need for simple user friendly digital tools in health. There already are some tool (_Activiteitenweger jongeren_ (GooglePlay)[https://play.google.com/store/apps/details?id=com.axendo.activiteitenweger2&hl=no], [AppStore](https://apps.apple.com/us/app/activiteitenweger/id1225495703)) available but, (_my bias_) being developed by researchers, that are lacking on the area of usability.  
> This was an attempt to remedy one simple such tool and an experiment in how fast we could get something going using AI, in this case https://bolt.new.

**Resources**

- [OsloMet: Aktivitetskalkulator](https://uni.oslomet.no/aktivitetskalkulator/)

## Technology

This is a very simple react SPA that stores the user's data with IndexDB, resulting in no data sharing to 3rd parties and no requirement for logging in.

`Tailwind` is used for styling, `idb` for easier IndexDB-usage and `Chart.JS` for graphs.

Initially created with: https://bolt.new
