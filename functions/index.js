import * as functions from "firebase-functions/v2";

// PROIZVODNA verzija: vraća OTP samo prijavljenim korisnicima
export const getPlaybackToken = functions.https.onCall(async (request) => {
  const user = request.auth; // ovo Firebase automatski popunjava

  if (!user) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Moraš biti prijavljen da bi dobio video token."
    );
  }

  const videoId = request.data.videoId;

  console.log(`Korisnik ${user.uid} traži token za videoId: ${videoId}`);

  // OVDE stavi stvarne vrednosti sa VdoCipher dashboarda za svoj video
  // Za produkciju bi ovde mogla da ide i logika koja proverava da li je korisnik kupio kurs
  return {
    otp: "20160313versUSE3232E09r1t0Mb7uTFcqnwK7JxhBPsrbJSYnExaOdw73hvFtmk",
    playbackInfo: "eyJ2aWRlb0lkIjoiZjUyYTIxMjUwY2I0NGVkOTkwYTBlY2Q5YzkxMGNhMGIifQ=="
  };
});
