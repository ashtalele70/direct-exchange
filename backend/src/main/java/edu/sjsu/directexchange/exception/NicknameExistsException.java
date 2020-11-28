package edu.sjsu.directexchange.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Nickname Already " +
	"Exists")
public class NicknameExistsException extends RuntimeException {
	/**
	 *
	 * @param message Opponents not found
	 */
	public NicknameExistsException(final String message) {
		super(message);
	}
}
