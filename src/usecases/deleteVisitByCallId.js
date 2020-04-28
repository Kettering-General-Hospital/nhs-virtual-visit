const deleteVisitByCallId = ({ getDb }) => async (callId) => {
  const db = await getDb();
  console.log("deleting visit for  ", callId);
  try {
    const results = await db.any(
      `DELETE FROM scheduled_calls_table WHERE call_id = $1 LIMIT 1`,
      callId
    );

    const result = results[0];
    console.log("result", result);

    return {
      result: {
        success: true,
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      result: null,
      error: error.toString(),
    };
  }
};

export default deleteVisitByCallId;
