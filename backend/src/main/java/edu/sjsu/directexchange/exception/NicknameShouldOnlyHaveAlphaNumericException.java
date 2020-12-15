package edu.sjsu.directexchange.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Nickname should " +
	"only have alphanumeric values")
public class NicknameShouldOnlyHaveAlphaNumericException extends RuntimeException {
	/**
	 *
	 * @param message Opponents not found
	 */
	public NicknameShouldOnlyHaveAlphaNumericException(final String message) {
		super(message);
	}
}
